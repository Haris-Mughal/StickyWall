/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { UesDoxContext } from "../../Context/DoxContext";
import dayjs from "dayjs";
import { Divider } from "antd";

export default function Today() {
  const { documents } = UesDoxContext();
  const [show, setShow] = useState(true);
  const [date, setDate] = useState("");
  const [todayDoc, setTodayDoc] = useState([]);

  useEffect(() => {
    let dat = dayjs().format("YYYY-MM-DD");
    setDate(dat);
  }, []);

  const getFun = () => {
    let today = [];
    // eslint-disable-next-line array-callback-return
    today = documents.filter((doc) => {
      // eslint-disable-next-line eqeqeq
      if (doc.startDate == date) {
        return doc;
      }
    });
    setTodayDoc(today);
    setShow(false);
  };

  useEffect(() => {
    getFun();
  }, [show]);
  return (
    <>
      <div className="container">
        <div className="row">
          {/* {show ? <button className='btn btn-primary text-white' onClick={getFun} >Show Task</button> : <div></div>} */}
          <h1>Today</h1>

          {todayDoc.map((doc, i) => {
            return (
              <>
                <div className="col-12 col-md-6 col-lg-4 " key={i}>
                  <div
                    className="box my-3 mx-sm-0 mx-md-0 mx-lg-3"
                    style={{ backgroundColor: `${doc.bgColor}` }}
                  >
                    <h3 className="text-center">{i + 1}</h3>
                    <Divider className="m-0 p-0" />

                    <h4>{doc.title}</h4>
                    <p>{doc.description}</p>
                    <p>
                      <b>Date :</b>
                      {doc.startDate} <b> To </b> {doc.endDate}
                    </p>
                    <p>
                      <b>Email :</b> {doc.createdBy.email}
                    </p>
                    <p>
                      <b>List :</b> {doc.lists}
                    </p>
                    <p>
                      <b>ID :</b> {doc.randumId}
                    </p>
                    <p>
                      <b>BgColor :</b> {doc.bgColor}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
