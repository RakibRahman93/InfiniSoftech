
import styles from './BootstrapPhonePreview.module.css';

export default function Iphone16ProPreview({src}) {
  return (
    <div className="my-5 d-flex justify-content-center">
      <div className={styles.iphoneFrame}>
        <div className={styles.dynamicIsland}></div>
        <iframe
          src={src}
          title="App Preview"
          className={styles.appIframe}
        ></iframe>
      </div>
    </div>
  );
}
