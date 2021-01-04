import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Select,
  Typography,
  Input,
  InputNumber,
  message,
} from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import useCourseContext from "../context/CourseContext";
import styled from "styled-components";
const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;
function AddNewCourse() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { addCourse } = useCourseContext();
  const [newCourse, setNewCourse] = useState({
    name: "",
    price: 1,
    amount: 1,
    type: "類別一",
    address: "",
  });
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // console.log(!!newCourse.name);
    if (!newCourse.name || !newCourse.type || !newCourse.address) {
      message.warning("請不要空白");
    } else if (
      typeof newCourse.price !== "number" ||
      typeof newCourse.amount !== "number" ||
      newCourse.price <= 0 ||
      newCourse.amount <= 0
    ) {
      message.warning("請輸入數字");
    } else {
      message.info("新增成功");
      setIsModalVisible(false);
      addCourse("courses", newCourse);
      //reset
      setNewCourse({
        name: "",
        price: 1,
        amount: 1,
        type: "類別一",
        address: "",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (value) => {
    setNewCourse({ ...newCourse, type: value });
  };
  useEffect(() => {
    // console.log(newCourse);
  }, [newCourse]);
  return (
    <>
      <Button type="primary" icon={<FileAddOutlined />} onClick={showModal}>
        新增課程
      </Button>
      <Modal
        title="新增課程"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        width={"100vw"}
        centered
      >
        <NewCourseWrapper>
          <div className="item">
            <Text type="secondary">類別</Text>
            <Select
              defaultValue="類別一"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="類別一">類別一</Option>
              <Option value="類別二">類別二</Option>
              <Option value="類別三">類別三</Option>
              <Option value="類別四">類別四</Option>
            </Select>
          </div>
          <div className="item">
            <Text type="secondary">名稱</Text>
            <Input
              placeholder="輸入課程名稱"
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
              value={newCourse.name}
            />
          </div>
          <div className="item">
            <Text type="secondary">課程總價</Text>
            <InputNumber
              min={1}
              max={100}
              step={0.1}
              onChange={(e) => setNewCourse({ ...newCourse, price: e })}
              value={newCourse.price}
            />
          </div>
          <div className="item">
            <Text type="secondary">數量</Text>
            <InputNumber
              min={1}
              max={100}
              onChange={(e) => setNewCourse({ ...newCourse, amount: e })}
              value={newCourse.amount}
            />
          </div>
        </NewCourseWrapper>
        <div className="item">
          <Text type="secondary">課程內容</Text>
          <TextArea
            rows={4}
            placeholder="課程內容"
            onChange={(e) =>
              setNewCourse({ ...newCourse, address: e.target.value })
            }
            value={newCourse.address}
          />
        </div>
      </Modal>
    </>
  );
}
const NewCourseWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export default AddNewCourse;
