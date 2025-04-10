import { Images } from '@/constants/common';
import { api_host } from '@/utils/api';
import { Flex, Image } from 'antd';
import { useParams, useSearchParams } from 'umi';
import Docx from './docx';
import Excel from './excel';
import Markdown from './markdown';
import Pdf from './pdf';
import Txt from './txt';

import { previewHtmlFile } from '@/utils/file-util';
import styles from './index.less';

// TODO: The interface returns an incorrect content-type for the SVG.

const DocumentViewer = () => {
  const { id: documentId } = useParams();
  const [currentQueryParameters] = useSearchParams();
  const ext = currentQueryParameters.get('ext');
  const prefix = currentQueryParameters.get('prefix');
  const api = `${api_host}/${prefix || 'file'}/get/${documentId}`;

  if (ext === 'html' && documentId) {
    previewHtmlFile(documentId);
    return;
  }
  return (
    <section className={styles.viewerWrapper}>
      {Images.includes(ext!) && (
        <Flex className={styles.image} align="center" justify="center">
          <Image src={api} preview={false}></Image>
        </Flex>
      )}
      {ext === 'pdf' && <Pdf url={api}></Pdf>}
      {ext === 'md' && <Markdown url={api}></Markdown>}
      {(ext === 'xlsx' || ext === 'xls') && <Excel filePath={api}></Excel>}
      {ext === 'docx' && <Docx filePath={api}></Docx>}
      {ext === 'txt' && <Txt url={api}></Txt>}
    </section>
  );
};

export default DocumentViewer;
