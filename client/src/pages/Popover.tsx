import React from 'react'
import { useState } from 'react'
import { Coordinator, DomainLead, Volunteer } from './Models'
import { FaTimes } from 'react-icons/fa'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

function Popover({ domainLeads, selectedPerson, direction, handleLeadClickEvent, setSelectedPerson }: any) {
  let leads: DomainLead[] = [selectedPerson];
  const [currentLeadDisplayed, setCurrentLeadDisplayed] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  domainLeads.forEach((person: any) => {
    if (person.role === selectedPerson.role && person.name !== selectedPerson.name) {
      leads.push(person);
    }
  });

  const handleLeadChange = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentLeadDisplayed(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div 
      className={`popover mx-auto h-full ${direction === 'top' ? 'transform -translate-y-full' : ''}`}
      style={{
        padding: 0,
        border: 'none',
        position: 'relative',
        zIndex: 80,
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleLeadClickEvent("close", selectedPerson, e, -1);
      }}
    >
      <div 
        className="fixed inset-0 flex items-center justify-center z-200 p-4 relative pointer-events-none h-full"
        style={ direction === 'top' ? { top: -250, boxShadow: '0 0 80px rgba(0, 0, 0, 0.35)', padding: 0 } : { top: 0, boxShadow: '0 0 80px rgba(0, 0, 0, 0.35)', padding: 0, overflowY: 'auto' } }
      >
        <div 
          id="org-popup"
          className="bg-white rounded-lg shadow-xl h-5/6 overflow-y-auto pointer-events-auto lg:w-2/3 md:w-4/5 sm:w-9/10 xs:w-9/10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className='absolute top-5 right-5'
            onClick={(e) => {
              e.stopPropagation();
              handleLeadClickEvent("close", selectedPerson, e, -1);
            }}
          >
            <FaTimes size={30} color='white' />
          </button>

          {/* <button>
            <FaAngleLeft size={40} color='white' className='absolute top-[50%] left-5'/>
          </button>
          
          <button>
            <FaAngleRight size={40} color='white' className='absolute top-[50%] right-5'/>
          </button> */}

          <div className="p-6">
            { leads.length == 1 ? (
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-500">
                  <img
                    src={selectedPerson.img}
                    alt={selectedPerson.role}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl text-center font-bold">{selectedPerson.role}</h2>
                <p className="text-lg text-center text-gray-600">{selectedPerson.name}</p>
              </div>
            ) : (
                <div className="flex flex-col items-center mb-6 relative">
                  <FaAngleLeft
                    size={40} 
                    color='grey' 
                    className='absolute top-[30%] lg:left-[60px] md:left-[30px] left-[10px] cursor-pointer hover:text-gray-700'
                    onClick={() => {
                      handleLeadChange((currentLeadDisplayed - 1 + leads.length) % leads.length);
                    }}
                  />

                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-500">
                    <img
                      src={leads[currentLeadDisplayed].img}
                      alt={leads[currentLeadDisplayed].role}
                      className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                      style={{ opacity: isTransitioning ? 0 : 1 }}
                    />
                  </div>
                  <h2 className="text-2xl text-center font-bold transition-opacity duration-300 ease-in-out" style={{ opacity: isTransitioning ? 0 : 1 }}>{leads[currentLeadDisplayed].role}</h2>
                  <p className="text-lg text-center text-gray-600 transition-opacity duration-300 ease-in-out" style={{ opacity: isTransitioning ? 0 : 1 }}>{leads[currentLeadDisplayed].name}</p>

                  <FaAngleRight 
                    size={40} 
                    color='grey' 
                    className='absolute top-[30%] lg:right-[60px] md:right-[30px] right-[10px] cursor-pointer hover:text-gray-700' 
                    onClick={() => {
                      handleLeadChange((currentLeadDisplayed + 1) % leads.length);
                    }}
                  />
                </div>
            ) }

            {selectedPerson && selectedPerson.coordinators.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4 pb-2 border-b border-blue-200 text-center">Coordinators</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedPerson.coordinators.map((coordinator: Coordinator, idx: number) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-3">
                        <img
                          src={coordinator.img}
                          alt={coordinator.name}
                          className="w-full h-full object-cover w-32 h-32"
                        />
                      </div>
                      <p className="text-center text-base md:text-md font-small" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {coordinator.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedPerson && selectedPerson.volunteers.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4 pb-2 border-b border-blue-200 text-center">Volunteers</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedPerson.volunteers.map((volunteer: Volunteer, idx: number) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-3">
                        <img
                          src={volunteer.img}
                          alt={volunteer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-center text-base md:text-lg font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {volunteer.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popover