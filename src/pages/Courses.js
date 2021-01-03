import React, { useState } from "react";
import { Table, Input, Button, Modal } from "antd";

import useCourseContext from "../context/CourseContext";

const { Search } = Input;
function Courses() {
  const { courses, deleteCourse } = useCourseContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [id, setId] = useState(null);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (modalTitle === "確認要刪除嗎") {
      deleteCourse("courses", id);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  if (courses) {
    //give action columns value of id
    const newCourses = courses.map((item) => {
      return { ...item, action: item.id };
    });
    const columns = [
      {
        title: "課程類別",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "課程名稱",
        dataIndex: "name",
        key: "name",
      },

      {
        title: "課程總價",
        dataIndex: "price",
        key: "price",
      },

      {
        title: "課程數量",
        dataIndex: "amount",
        key: "amount",
      },

      {
        title: "課程地址",
        dataIndex: "address",
        key: "address",
        render: () => {
          return (
            <>
              {/* open modal */}
              <Button
                type="dashed"
                onClick={(e) => {
                  setModalTitle("查看課程");
                  showModal();
                }}
              >
                查看課程
              </Button>
            </>
          );
        },
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (id) => (
          <>
            {/* change state value and post /deleted */}
            <Button
              type="link"
              onClick={(e) => {
                setModalTitle("編輯");
                showModal();
                setId(id);
              }}
            >
              編輯
            </Button>
            <Button
              danger
              onClick={(e) => {
                setModalTitle("確認要刪除嗎");
                showModal();
                setId(id);
              }}

              // ()=>deleteCourse("courses", id)}
            >
              刪除
            </Button>
          </>
        ),
      },
    ];
    return (
      <div>
        <Search
          placeholder="請輸入搜尋課程名稱"
          // onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Table
          style={{ marginTop: 12 }}
          columns={columns}
          dataSource={newCourses}
          rowKey={(courses) => courses.id}
        />
        <Modal
          title={modalTitle}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        ></Modal>
      </div>
    );
  }
}

export default Courses;
