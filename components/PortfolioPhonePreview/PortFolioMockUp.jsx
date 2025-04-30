import styles from "./BootstrapPhonePreview.module.css";

export default function PortFolioMockUp({ src, mockupType }) {
  const frameClass =
    mockupType === "tablet" ? styles.tabletFrame : styles.iphoneFrame;
  return (
    <div className="my-5 d-flex justify-content-center">
      <div className={frameClass}>
        <iframe
          src={src}
          title="App Preview"
          className={styles.appIframe}
        ></iframe>
      </div>
    </div>
  );
}
