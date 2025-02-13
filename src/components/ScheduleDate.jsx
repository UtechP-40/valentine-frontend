import {X} from "lucide-react"

const ScheduleDate = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-red-500">💕 Schedule a Romantic Date</h2>
          <input type="date" className="mt-4 w-full p-2 border rounded-md" />
          <input type="time" className="mt-2 w-full p-2 border rounded-md" />
          <input type="text" className="mt-2 w-full p-2 border rounded-md" placeholder="Enter location" />
          <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
            Schedule 📅
          </button>
        </div>
      </div>
    );
  };
  export default ScheduleDate;
  