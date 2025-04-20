// components/Iphone16ProPreview.js

import styles from './BootstrapPhonePreview.module.css';

export default function Iphone16ProPreview({src}) {
  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className={styles.iphoneFrame}>
        <div className={styles.dynamicIsland}></div>
        <iframe
          src={src}
          title="iPhone 16 Pro App Preview"
          className={styles.appIframe}
        ></iframe>
      </div>
    </div>
  );
}
