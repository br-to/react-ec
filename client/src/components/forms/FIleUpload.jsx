import React from 'react';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import API from '../../utils/API';
import { Avatar, Badge } from 'antd';

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  // const [files, setFiles] = useState([]);

  const fileUploadResize = (e) => {
    console.log(e.currentTarget.files);
    let files = e.currentTarget.files;
    let allUploadedFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            API.uploadImages(uri, user)
              .then((res) => {
                console.log('IMAGE UPLOAD RES DATA', res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log('CLOUDINARY UPLAOD ERR', err);
              });
          },
          'base64'
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    API.removeImage(user, public_id)
      .then((res) => {
        setLoading(false);
        console.log('remove images', res);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: 'pointer' }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <br />
      <div className="row">
        <label className="btn btn-primary btn-raised">
          画像を選択してください
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            name="images"
            onChange={fileUploadResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
