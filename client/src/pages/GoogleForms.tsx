import { useState } from "react";

const TabComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Join GDGC VNRVJIET - Recruitment Form
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            We're looking for passionate members to join our team. Fill out the form below to apply!
          </p>
        </div>

        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden min-h-[600px] sm:min-h-[800px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base font-medium">Loading recruitment form...</p>
              </div>
            </div>
          )}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfOA4D-38puhuc1yjlxastT6nwK38jGSYq6EsQbyT2eteqJ7g/viewform?embedded=true"
            className="w-full h-[600px] sm:h-[800px] lg:h-[900px] border-0"
            allowFullScreen
            onLoad={handleIframeLoad}
            title="GDSC VNRVJIET Recruitment Form"
          >
            Loading recruitment form...
          </iframe>
        </div>

        <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
          <p>
            Having trouble with the form?{" "}
            <a 
              href="https://forms.gle/wbiCraKhAd2oJUpv8" 
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

export default TabComponent;
