import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      toast("Password saved !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error : Password not saved !");
    }
  };
  const deletePassword = (id) => {
    console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("Password Deleted !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const editPassword = (id) => {
    console.log("Editing password with id ", id);
    setform(passwordArray.filter((i) => i.id === id[0]));
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      {/* <div className="p-3 md:mycontainer min-h-[85vh]"> */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 min-h-[85vh]">

        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your own Password Manager
        </p>
        <div className="text-black flex flex-col p-3 gap-8 items-center">
          <input
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 p-4 w-full py-1"
            type="text"
            name="site"
            id="site"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex w-full justify-between gap-8">
            <input
              placeholder="Enter Username"
              className="rounded-full border border-green-500 p-4 w-full py-1"
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative">
              <input
                ref={passwordRef}
                placeholder="Enter Password"
                className="flex flex-col md:flex-row rounded-full border border-green-500 p-4 w-full py-1"
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-1 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={25}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-6 py-2 w-fit border border-green-900"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-xl py-2">Your Password</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddinLeft: "3px",
                                "paddingT op": "3px",
                              }}
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingLeft: "3px",
                                paddingTop: "3px",
                              }}
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingLeft: "3px",
                                paddingTop: "3px",
                              }}
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/nwfpiryp.json"
                              trigger="hover"
                              colors="primary:#ebe6ef,secondary:#f9c9c0,tertiary:#000000,quaternary:#3a3347"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xyfswyxf.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
