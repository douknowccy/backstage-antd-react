import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
export default function showDeleteConfirm({ modalTitle, id, deleteCourse }) {
  confirm({
    title: `${modalTitle}`,
    icon: <ExclamationCircleOutlined />,
    content: "刪除後就不可回復",
    okText: "確定",
    okType: "danger",
    cancelText: "取消",
    onOk() {
      deleteCourse("courses", id);
    },
    // onCancel() {
    //   console.log("Cancel");
    // },
  });
}
