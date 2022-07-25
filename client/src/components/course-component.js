import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const TakeToLogin = () => {
    navigate("/login");
  };
  let [courseData, setCourseData] = useState(null);
  useEffect(() => {
    console.log("Using effect.");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }
    if (currentUser.user.role == "instructor") {
      console.log("抓取講師課程資料中");
      courseService
        .get(_id)
        .then((data) => {
          console.log(data.data);
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("抓取學生課程資料中");
      courseService
        .getEnrolledCourses(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const priceButtonPlay = () => {
    window.alert("點屁啊，這按鈕裝飾用而已");
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>Course頁面要登入才能造訪！</p>
          <button className="btn btn-lg btn-primary" onClick={TakeToLogin}>
            點我導向登入頁面！
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>此為學生Course頁面</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>此為講師Course頁面</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div>
          <p>這裡是從資料庫抓回來的課程資料：</p>
          {courseData.map((course) => (
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="card-text">
                  課程學生總人數：{course.students.length}
                </p>
                <button onClick={priceButtonPlay} className="btn btn-primary">
                  {course.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
