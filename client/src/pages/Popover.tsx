import React from 'react'
import { Coordinator, DomainLead, Volunteer } from './Models'

function Popover({ selectedPerson, direction }: any) {
  return (
    <div 
      className={`popover w-full max-w-lg mx-auto ${direction === 'top' ? 'transform -translate-y-full' : ''}`}
      style={{
        padding: 0,
        border: 'none',
        position: 'relative',
        width: '700px'
      }}
    >
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
        style={ direction === 'top' ? { position: 'relative', top: -250, boxShadow: '0 0 80px rgba(0, 0, 0, 0.35)', padding: 0 } : { position: 'relative', top: 0, boxShadow: '0 0 80px rgba(0, 0, 0, 0.35)', padding: 0 } }
      >
        <div 
          id="org-popup"
          className="bg-white rounded-lg shadow-xl overflow-y-auto pointer-events-auto w-full"
        >
          <div className="p-6">
            {/* <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-500">
                <img
                  src={selectedPerson.img}
                  alt={selectedPerson.role}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold">{selectedPerson.role}</h2>
              <p className="text-lg text-gray-600">{selectedPerson.name}</p>
            </div> */}

            {selectedPerson && selectedPerson.coordinators.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4 pb-2 border-b border-blue-200 text-center">Coordinators</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {selectedPerson.coordinators.map((coordinator: Coordinator, idx: number) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-32 h-32 md:w-30 md:h-30 rounded-full overflow-hidden mb-3">
                        <img
                          src={coordinator.img}
                          alt={coordinator.name}
                          className="w-full h-full object-cover w-32 h-32"
                          // style={{ height: 50, width: 50 }}
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
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Volunteers</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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