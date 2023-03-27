import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../PostShare/PostShare";

const ShareModal = ({modalOpened, setModalOpened, isEdit, setIsEdit, post}) => {

  const theme = useMantineTheme();

  const handleCloseModal = () => {
    setModalOpened(false)
    setIsEdit(false)
  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpened}
      onClose={handleCloseModal}
    >
      <div style={{textAlign: "center", fontSize: "20px"}}>
        Editing post
      </div>
      <PostShare isEdit={isEdit} editPostId={post}/>
    </Modal>
  );
};

export default ShareModal;
