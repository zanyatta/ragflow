import { useEffect, useState } from 'react';
import FileError from '../file-error';
import './index.less';
interface IProps {
  url: string;
}

const Txt = ({ url }: IProps) => {
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
    <div className="txt-container">
      {success ? (
        <pre className="txt-content">{content}</pre>
      ) : (
        <FileError>{content}</FileError>
      )}
    </div>
  );
};
export default Txt;
