export interface Person {
  role: string;
  name: string;
  img: string;
}

export interface Coordinator {
  name: string;
  img: string;
}

export interface Volunteer {
  name: string;
  img: string;
}

export interface DomainLead extends Person {
  coordinators: Coordinator[];
  volunteers: Volunteer[];
  type?: string;
}

export interface OrgChartData {
  facultyAdvisor: Person;
  lead: Person;
  domainLeads: DomainLead[];
}