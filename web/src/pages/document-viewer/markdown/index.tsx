import MarkdownPreview from '@uiw/react-markdown-preview';
import { useEffect, useState } from 'react';
import FileError from '../file-error';
import './index.less';
interface IProps {
  url: string;
}

const Markdown = ({ url }: IProps) => {
  const [content, setContent] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(true);
  useEffect(() => {
    const loadDocument = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setContent(text);
        setSuccess(true);
      } catch (error: any) {
        setContent(error);
        setSuccess(error);
      }
    };
    loadDocument();
  }, [url]);

  return (
    <div className="md-container">
      {success ? (
        <MarkdownPreview
          className="md-content"
          source={content}
        ></MarkdownPreview>
      ) : (
        <FileError>{content}</FileError>
      )}
    </div>
  );
};
export default Markdown;
