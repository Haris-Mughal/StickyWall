/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Select, Divider, Modal } from "antd";
import { DatePicker, Space } from "antd";
import { useAuthContext } from "../../Context/AuthContext";
import { firestore } from "../../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { UesDoxContext } from "../../Context/DoxContext";
// import { Link } from "react-router-dom";
const initialdate = { startDate: "", endDate: "" };
const initialState = { title: "", description: "", list: "" };
const colorArr = [
  "#FDF2B3",
  "#D1EAED",
  "#FFDADA",
  "#FFD4A9",
  "#f5ebe0",
  "#b8dbd9",
  "#FDF2B3",
  "#b7e4c7",
];
const { RangePicker } = DatePicker;

export default function StickyWall() {
  // const [state, setState] = useState(initialState)

  const { documents } = UesDoxContext();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialState);
  const { user } = useAuthContext();
  const [confirmLoading, setConfirmLoading] = useState(false);

  // --------------------- handle date ------------------
  const [date, setDate] = useState([]);
  const [objdate, setObjDate] = useState(initialdate);
  const handleDate = (_, dateString) => {
    setDate(dateString);
  };
  // -------------------------handle date end

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  // ---------------------- add task modal -------------------
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    window.notify("You Cancel the task", "info");
    setOpen(false);
  };

  const handleOk = async () => {
    let { title, description } = state;
    let todo = { title, description };
    let { startDate, endDate } = objdate;
    startDate = date[0];
    endDate = date[1];
    todo.startDate = startDate;
    todo.endDate = endDate;
    todo.randumId = Math.random().toString(36).slice(2);
    todo.bgColor = colorArr[Math.floor(Math.random() * (7 + 1))];
    todo.dateCreated = new Date().getTime();
    todo.lists = [];
    todo.createdBy = {
      email: user.email,
      uid: user.uid,
    };
    if (title.length < 3) {
      return window.notify("Plz enter title!", "info");
    }
    if (description.length < 10) {
      return window.notify("Plz enter description!", "info");
    }
    setConfirmLoading(true);
    try {
      await setDoc(doc(firestore, "todos", todo.randumId), todo);
      setConfirmLoading(false);
      setOpen(false);
      window.notify("Add Task Successuly", "success");
    } catch (err) {
      window.notify("Task is not added", "error");
    }
    setState(initialState);
    setObjDate(initialState);
    setDate([]);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {documents.map((doc, i) => {
            return (
              <>
                <div className="col-12 col-md-6 col-lg-4" id="card" key={i}>
                  <div
                    className="box my-3 mx-sm-0 mx-md-0 mx-lg-3"
                    // id="sticky"
                    style={{ backgroundColor: `${doc.bgColor}` }}
                  >
                    <h3 className="text-center">{i + 1}</h3>
                    <Divider className="m-0 p-0" />
                    <h4>{doc.title}</h4>
                    <p>{doc.description}</p>
                    <p>
                      {doc.startDate} <b> To </b> {doc.endDate}
                    </p>
                    {/* <p>Email : {doc.createdBy.email}</p> */}
                    {/* <p>ID : {doc.randumId}</p> */}
                    {/* <p>BgColor : {doc.bgColor}</p> */}
                  </div>
                </div>
              </>
            );
          })}

          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3"
              onClick={showModal}
            >
              <a className="Plus nav-link">+</a>
            </div>
          </div>
        </div>
      </div>

      {/* --------------- Modal --------------- */}
      <Modal
        title="Add Sticky"
        className="fs-1 fw-bold"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="row">
          <div className="col">
            <label htmlFor="title" className="fw-bold">
              Title
            </label>{" "}
            <br />
            <input
              type="text"
              placeholder="Enter title"
              id="title"
              className="w-100 form-control"
              value={state.title}
              name="title"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="floatingTextarea2" className="fw-bold mt-2">
              Description
            </label>{" "}
            <br />
            <div className="form-floating">
              <textarea
                className="form-control"
                id="floatingTextarea2"
                style={{ height: "80px" }}
                name="description"
                value={state.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 mt-2">
            <label className="fw-bold ">Date</label> <br />
            <Space direction="vertical" size={12}>
              <RangePicker onChange={handleDate} />
            </Space>
          </div>
          <div className="col-6 mt-2">
            <label className="fw-bold ">List</label> <br />
            <Select
              name="lists"
              id="lists"
              className="w-100"
              placeholder="Lists"
              value={state.list}
              onChange={(list) => setState((s) => ({ ...s, list }))}
            >
              {["Personal", "Work"].map((list, i) => {
                return (
                  <Select.Option key={i} value={list}>
                    {list}
                  </Select.Option>
                );
              })}
              {/* <Select.Option value="list1">Personal</Select.Option>
              <Select.Option value="list2">Work</Select.Option> */}
            </Select>
            {/* <Select value={state.status} onChange={status => setState(s => ({ ...s, status }))}>
                        {["active", "inactive"].map((status, i) => {
                          return <Select.Option key={i} value={status}>{status}</Select.Option>
                        })}
                      </Select> */}
          </div>
        </div>
        <div className="row">
          <div className="col mt-3">
            <label className="fw-bold ">Background Color</label> <br />
            <input type="color" style={{ height: 30, width: 50 }} />
          </div>
        </div>
      </Modal>
    </>
  );
}
