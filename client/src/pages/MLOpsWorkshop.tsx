import { useState } from "react";
import Banner from "../images/Convergence Banner.jpg";

const MLOpsWorkshop: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <img src={Banner} alt="Convergence Poster" style={{ width: '100%', marginBottom: 20 }} />
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            MLOps Workshop - Registration Form
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            
          </p>
        </div>

        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base font-medium">
                  Loading enrollment form...
                </p>
              </div>
            </div>
          )}
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSdqSaZcbDX2lzSLMlpbmKz9IPvaCxQVbFyrdc8mPQh1SuZc2Q/viewform?embedded=true" 
            className="w-full h-[700px] sm:h-[900px] lg:h-[1000px] border-0"
            allowFullScreen
            onLoad={handleIframeLoad}
            title="Google Cloud Study Jams - Campus Participant Enrolment Form"
          >
            Loading enrollment form...
          </iframe>
        </div>

        <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
          <p>
            Having trouble with the form?{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf3QxAnBP6XHvhOLxn8NLxB-wLl3Fmu9aHsdR9oDKAGshGbIQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Open in new tab
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MLOpsWorkshop;
