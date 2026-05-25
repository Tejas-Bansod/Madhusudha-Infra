export type TaskType = 'Follow-up' | 'Call' | 'Meeting' | 'Property visit' | 'Documentation pending' | 'Agent assignment';
export type TaskStatus = 'Todo' | 'In Progress' | 'Completed';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee: {
    name: string;
    initials: string;
    avatar?: string;
  };
}

export const mockTasks: Task[] = [
  {
    id: "TSK-001",
    title: "Call John Doe regarding 3BHK Apartment in Gachibowli",
    description: "Discuss the final pricing and parking allocation. The client seemed interested but wanted a 5% discount.",
    type: "Call",
    status: "Todo",
    priority: "High",
    dueDate: "2026-05-26T10:00:00",
    assignee: { name: "Arjun Mehta", initials: "AM" }
  },
  {
    id: "TSK-002",
    title: "Site visit with Priya Sharma",
    description: "Show the 4 BHK Villa in Jubilee Hills. Ensure the keys are collected from the site office beforehand.",
    type: "Property visit",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-05-25T15:30:00",
    assignee: { name: "Neha Reddy", initials: "NR" }
  },
  {
    id: "TSK-003",
    title: "Draft Sale Agreement for Plot #42",
    description: "Legal team needs to review the draft before we send it to Rajesh Patel.",
    type: "Documentation pending",
    status: "Todo",
    priority: "Medium",
    dueDate: "2026-05-28T14:00:00",
    assignee: { name: "Vikram Singh", initials: "VS" }
  },
  {
    id: "TSK-004",
    title: "Assign new leads from the weekend campaign",
    description: "We have 45 new leads from Facebook ads that need to be distributed among the sales agents.",
    type: "Agent assignment",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-05-24T09:00:00",
    assignee: { name: "Madhusudha Admin", initials: "MA" }
  },
  {
    id: "TSK-005",
    title: "Follow-up on the loan approval for the Kondapur Flat",
    description: "Check with HDFC bank representative on the status of Mr. Kumar's loan.",
    type: "Follow-up",
    status: "Todo",
    priority: "Low",
    dueDate: "2026-05-27T11:00:00",
    assignee: { name: "Priya Sharma", initials: "PS" }
  },
  {
    id: "TSK-006",
    title: "Monthly Sales Review Meeting",
    description: "Discuss Q2 targets and performance with the entire sales team. Present the new incentive structure.",
    type: "Meeting",
    status: "Todo",
    priority: "High",
    dueDate: "2026-05-30T10:00:00",
    assignee: { name: "Madhusudha Admin", initials: "MA" }
  },
  {
    id: "TSK-007",
    title: "Collect KYC documents from new client",
    description: "Need Aadhar card and PAN card copies for the property registration in Madhapur.",
    type: "Documentation pending",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2026-05-26T16:00:00",
    assignee: { name: "Arjun Mehta", initials: "AM" }
  },
  {
    id: "TSK-008",
    title: "Follow-up with site supervisor regarding interior works",
    description: "The client for Villa 12 wants an update on the woodwork progress.",
    type: "Follow-up",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2026-05-25T14:00:00",
    assignee: { name: "Vikram Singh", initials: "VS" }
  }
];
