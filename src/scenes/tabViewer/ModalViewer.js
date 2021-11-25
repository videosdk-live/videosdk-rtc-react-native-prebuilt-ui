import React from "react";
import { Modal } from "react-native";
import TabViewer from "./TabViewer";

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.visibleTabViewerModal === nextProps.visibleTabViewerModal &&
    prevProps.tabIndex === nextProps.tabIndex
  );
};

function ModalViewer({
  visibleTabViewerModal,
  setvisibleTabViewerModal,
  tabIndex,
}) {
  return (
    <Modal
      animationType="slide"
      visible={visibleTabViewerModal}
      onRequestClose={() => {
        setvisibleTabViewerModal(false);
      }}
    >
      <TabViewer
        setvisibleTabViewerModal={setvisibleTabViewerModal}
        tabIndex={tabIndex}
      />
    </Modal>
  );
}

export default React.memo(ModalViewer, areEqual);
