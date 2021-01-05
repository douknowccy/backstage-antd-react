import React, { useState } from "react";
import { Table, Input, Button, Modal } from "antd";
import querySearch from "../components/querySearch";
import useCourseContext from "../context/CourseContext";
import showDeleteModal from "../components/showDeleteModal";
import AddNewCourse from "../components/AddNewCourse";
import { RedoOutlined } from "@ant-design/icons";
const { Search } = Input;
function Courses() {
  const { queryCourses, deleteCourse, queryData, courses } = useCourseContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [addressText, setAddressText] = useState("");
  const addressContent = (id) => {
    const content = queryCourses.filter((item) => item.id === id);

    setAddressText(content[0].address);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setAddressText("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAddressText("");
  };
  const handleSearch = ({ query, newCourses }) => {
    queryData(querySearch({ query, newCourses, courses }));
  };

  // console.log(newCourses);
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
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 2,
      },
    },

    {
      title: "課程數量",
      dataIndex: "amount",
      key: "amount",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 2,
      },
    },

    {
      title: "課程地址",
      dataIndex: "address",
      key: "address",
      render: (id) => {
        return (
          <>
            {/* open modal */}
            <Button
              type="dashed"
              onClick={(e) => {
                setModalTitle("查看課程");
                showModal();
                addressContent(id);
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
            }}
          >
            編輯
          </Button>
          <Button
            danger
            onClick={(e) => {
              setModalTitle("確認要刪除嗎");
              showDeleteModal({ modalTitle, id, deleteCourse });
            }}

            // ()=>deleteCourse("courses", id)}
          >
            刪除
          </Button>
        </>
      ),
    },
  ];
  if (!queryCourses) {
    return <div>loading</div>;
  } else {
    //give action columns value of id
    const newCourses = queryCourses.map((item) => {
      return { ...item, action: item.id, address: item.id };
    });
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Search
            placeholder="請輸入搜尋課程名稱"
            onSearch={(query) => handleSearch({ query, newCourses })}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            icon={<RedoOutlined />}
            onClick={() => handleSearch({ query: "", newCourses: [] })}
          ></Button>
          <AddNewCourse />
        </div>
        <Table
          style={{
            marginTop: 12,
          }}
          columns={columns}
          dataSource={newCourses}
          rowKey={(courses) => courses.id}
        />

        <Modal
          title={modalTitle}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          width={"70vw"}
        >
          {addressText}
        </Modal>
      </>
    );
  }
}

export default Courses;
