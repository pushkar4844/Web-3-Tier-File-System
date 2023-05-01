import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppContext from "../AppContext";

const CLOUDFRONT_URL = "https://d2zxcud3lkcg8e.cloudfront.net/";

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const UploadDocumentModal = ({
  setShowModal,
  fileToEdit,
  setFileToEdit,
}: {
  setShowModal: React.Dispatch<boolean>;
  fileToEdit: any;
  setFileToEdit: React.Dispatch<any>;
}): JSX.Element => {
  const [file, setFile] = React.useState<File | undefined>();
  const [description, setDescription] = React.useState(
    fileToEdit?.description || ""
  );

  const handleFileUpload = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData();
    // @ts-expect-error
    formData.append("file", file);
    formData.append("description", description);
    if (fileToEdit?.id) {
      axios
        .put(
          `${process.env.REACT_APP_ENDPOINT}/files/${fileToEdit?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log({ res }, res.data);
          setFileToEdit(undefined);
          setShowModal(false);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log({ res }, res.data);
          setShowModal(false);
        });
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-center text-3xl font-monsterrat font-semibold">
        Upload Document
      </h1>
      <form className="w-full p-6" onSubmit={handleFileUpload}>
        <div className="flex flex-wrap mb-6 font-poppins">
          <label
            htmlFor="document"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Document:
          </label>
          <input
            type="file"
            name="document"
            id="document"
            className="p-3 bg-gray-200 rounded form-input w-full"
            onChange={(e) => setFile(e.target.files![0])}
          />
        </div>
        <div className="flex flex-wrap mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Description:
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="p-3 bg-gray-200 rounded form-input w-full"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="flex flex-wrap mb-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export const Files = (): JSX.Element => {
  const [files, setFiles] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [fileToEdit, setFileToEdit] = React.useState();
  const navigate = useNavigate();
  const { setIsAuthenticated, setToken } = React.useContext(AppContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/files`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFiles(res.data.files);
        console.log({ files }, res.data.files);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showModal]);

  const updateFiles = async (): Promise<void> => {
    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/files`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFiles(res.data.files);
        console.log({ files }, res.data.files);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col w-[80vw] justify-center mx-auto">
      {/* Header with logout button */}
      {showModal && (
        <UploadDocumentModal
          setShowModal={setShowModal}
          fileToEdit={fileToEdit}
          setFileToEdit={setFileToEdit}
        />
      )}
      <div className="flex justify-between items-center py-8">
        <h1 className="text-3xl font-monsterrat font-semibold">Files</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto mr-8"
          onClick={() => {
            setShowModal(!showModal);
            setFileToEdit(undefined);
            updateFiles().then(() => {});
          }}
        >
          Upload
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            sessionStorage.clear();
            setIsAuthenticated(false);
            setToken("");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    File Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Upload Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Updated Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.length > 0 ? (
                  files.map((file: any, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {file?.fileName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {formatDate(file?.uploadTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {formatDate(file?.updatedTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {file?.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button
                          className="text-purple-500 hover:text-purple-700 pr-4"
                          onClick={() => {
                            window.open(
                              `${CLOUDFRONT_URL}${file?.fileName}`,
                              "_blank"
                            );
                          }}
                        >
                          Download
                        </button>
                        <button
                          className="text-blue-500 hover:text-blue-700 px-4"
                          onClick={(e) => {
                            setShowModal(true);
                            setFileToEdit(file);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 px-4"
                          onClick={(e) => {
                            axios
                              .delete(
                                `${process.env.REACT_APP_ENDPOINT}/files/${file?.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                }
                              )
                              .then((res) => {
                                console.log(res);
                                updateFiles().then(() => {});
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      No files found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
