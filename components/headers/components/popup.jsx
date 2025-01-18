
import "../Popup.css"

const Popup = ({children, isPopupVisible, onClose}) => {
  return (
    <div className="popup-area">
        <div
          className={`popup-overlay ${
            isPopupVisible ? "popup-show" : "popup-hide"
          }`}
          onClick={onClose}
        >
          <div
            className="popup-container"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button onClick={onClose} className="popup-close-btn">
              ✕
            </button>

            {/* Popup Content */}
            <div className="popup-content">
              {children}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Popup
