import { ChevronLeft, ChevronRight, Users, Presentation as FilePresentation, Rocket } from 'lucide-react';
import { useState } from 'react';

interface TeamMember {
  email: string;
  mobile: string;
  branch: string;
  section: string;
  Name:string,
  year:string,
  // firstName: string;
  // lastName: string;
  rollNumber: string;
  gender: string;
}

const initialMemberState: TeamMember = {
  email: '',
  mobile: '',
  year:'',
  branch: '',
  section: '',
  Name:'',
  // firstName: '',
  // lastName: '',
  rollNumber: '',
  gender: ''
};

function Registration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([{ ...initialMemberState }]);
  const [pptLink, setPptLink] = useState('');
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const minL=3;
  const maxL=5;
  // let curL;
  // const [curL,setCurL] = useState("");
  const [curL, setCurL] = useState<number | "">("");
  
  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    if (!isNaN(value) && value >= minL && value <= maxL) {
      setCurL(value);
    } else {
      setCurL("");
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeamMembers(prev => {
      const newMembers = [...prev];
      newMembers[currentMemberIndex] = {
        ...newMembers[currentMemberIndex],
        [name]: value
      };
      return newMembers;
    });
  };

  const addTeamMember = () => {
    if (teamMembers.length < Number(curL)) {
      setTeamMembers(prev => [...prev, { ...initialMemberState }]);
      // Don't automatically navigate to the new member
    }
  };

  const goToPreviousMember = () => {
    if (currentMemberIndex > 0) {
      setCurrentMemberIndex(currentMemberIndex - 1);
    }
  };

  const goToNextMember = () => {
    if (currentMemberIndex < teamMembers.length - 1) {
      setCurrentMemberIndex(currentMemberIndex + 1);
    } 
    // else if(){

    // }
    else if (isCurrentStepValid() && currentMemberIndex === teamMembers.length - 1) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Team Members:', teamMembers);
      console.log('PPT Link:', pptLink);
      alert('Registration successful!');
    }
  };

  const isCurrentStepValid = () => {
    const currentMember = teamMembers[currentMemberIndex];

    return currentMember.email && 
           currentMember.mobile && 
           currentMember.year &&
           currentMember.branch && 
           currentMember.section && 
           currentMember.Name &&
          //  currentMember.firstName && 
          //  currentMember.lastName && 
           currentMember.rollNumber && 
           currentMember.gender;
  };

  const isFormValid = () => {
    return teamMembers.every(member => 
      member.email && 
      member.mobile && 
      member.year &&
      member.branch && 
      member.section && 
      member.Name && 
      member.rollNumber && 
      member.gender
    ) && pptLink;
  };

  const isTL = () =>{
    return currentMemberIndex ===0
  };

  // Function to handle navigation to a specific member
  const navigateToMember = (index: number) => {
    if (index >= 0 && index < teamMembers.length) {
      setCurrentMemberIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Rocket className="h-12 w-12 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 ml-4">TechHerForward Hackathon Registration</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Image and Info */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 ">
              <img 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Hackathon"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Join the Innovation Journey</h2>
                <p className="text-gray-600">
                  Get ready to showcase your skills, collaborate with talented individuals, and create 
                  innovative solutions that can make a difference. This hackathon is your platform to 
                  turn your ideas into reality.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {/* <li>Form teams of up to 4 members</li> */}
                  <li>Submit your project presentation</li>
                  <li>Win exciting prizes</li>
                  <li>Network with industry experts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right side - Registration Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center ${currentStep === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                      <Users className="h-5 w-5" />
                    </div>
                    <span className="ml-2 text-sm font-medium">Team Details</span>
                  </div>
                  <div className="flex-1 h-1 mx-4 bg-gray-200">
                    <div className={`h-full bg-indigo-600 transition-all duration-300`} style={{ width: `${(currentStep / 1) * 100}%` }}></div>
                  </div>
                  <div className="flex items-center">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center ${currentStep === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                      <FilePresentation className="h-5 w-5" />
                    </div>
                    <span className="ml-2 text-sm font-medium">Submission</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 0 && (
                  
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {currentMemberIndex === 0 ? 'Team Leader Details' : `Team Member ${currentMemberIndex + 1} Details`}
                    </h2>
                    {
                        isTL() && (<div>
                          <label className="block text-sm font-medium text-gray-700">Team size</label>
                          <input
                            type="number"
                            name="teamsize"
                            value={curL}
                            onChange={handleTeamSizeChange}
                            className="mt-1 block w-full rounded-md border border-gray-400 py-3 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                          {curL === "" && (
                            <p className="text-yellow-500 text-sm mt-1">
                              Please enter a team size between {minL} and {maxL}.
                            </p>
                          )}
                        </div>)
                      }

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          name="Name"
                          value={teamMembers[currentMemberIndex].Name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-400 py-3 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>

                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={teamMembers[currentMemberIndex].lastName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-400 py-1 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div> */}

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={teamMembers[currentMemberIndex].email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-400 py-3 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                        <input
                          type="tel"
                          name="mobile"
                          value={teamMembers[currentMemberIndex].mobile}
                          onChange={handleInputChange}
                          pattern="[0-9]{10}"
                          className="mt-1 block w-full rounded-md border border-gray-400 py-3 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Year</label>
                        <select
                          name="year"
                          value={teamMembers[currentMemberIndex].year}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-400 py-3 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        >
                          <option value="">Select Year</option>
                          <option value="1">I</option>
                          <option value="2">II</option>
                          <option value="3">III</option>
                          <option value="4">IV</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Branch</label>
                        <input
                          type="text"
                          name="branch"
                          value={teamMembers[currentMemberIndex].branch}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-400 py-3 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Section</label>
                        <select
                          name="section"
                          value={teamMembers[currentMemberIndex].section}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-400 py-3 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        >
                          <option value="">Select Section</option>
                          <option value="a">A</option>
                          <option value="b">B</option>
                          <option value="c">C</option>
                          <option value="d">D</option>
                        </select>
                      </div>

                      

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                        <input
                          type="text"
                          name="rollNumber"
                          value={teamMembers[currentMemberIndex].rollNumber}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-400 py-3 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                          name="gender"
                          value={teamMembers[currentMemberIndex].gender}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-400 py-3 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={goToPreviousMember}
                        disabled={currentMemberIndex === 0}
                        className={`inline-flex items-center px-4 py-2 rounded-md ${
                          currentMemberIndex === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        <ChevronLeft className="h-5 w-5 mr-2" />
                        Previous Member
                      </button>

                      <div className="flex space-x-4">
                       {/* {teamMembers.length < 4 && (
                          <button
                            type="button"
                            onClick={addTeamMember}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            <Users className="h-5 w-5 mr-2" />
                            Add Team Member
                          </button>
                        )} */}
                        <button
                          type="button"
                          onClick={
                            teamMembers.length < Number(curL) ? addTeamMember :  goToNextMember
                          }
                          disabled={!isCurrentStepValid()}
                          className={`inline-flex items-center px-4 py-2 rounded-md ${
                            !isCurrentStepValid()
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }`}
                        >
                          {currentMemberIndex === teamMembers.length - 1 ? 'Next Step' : 'Next Member'}
                          <ChevronRight className="h-5 w-5 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Project Submission</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        PPT Presentation Link (Google Drive/OneDrive)
                      </label>
                      <input
                        type="url"
                        value={pptLink}
                        onChange={(e) => setPptLink(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="https://drive.google.com/..."
                        required
                      />
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(0)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        <ChevronLeft className="h-5 w-5 mr-2" />
                        Back to Team Details
                      </button>

                      <button
                        type="submit"
                        disabled={!isFormValid()}
                        className={`inline-flex items-center px-6 py-2 rounded-md ${
                          !isFormValid()
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        Register Team
                        <Rocket className="h-5 w-5 ml-2" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
