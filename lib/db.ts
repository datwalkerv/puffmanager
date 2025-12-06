type Org = { id: string; name: string };
type Project = { id: string; name: string; organizationId: string; createdAt: string };
type ChatRoom = { id: string; projectId: string; createdAt: string };

let orgs: Org[] = [
    { id: 'org_1', name: 'PuffContent' },
    { id: 'org_2', name: 'ClientX' },
];

let projects: Project[] = [];
let chats: ChatRoom[] = [];

export async function getOrganizations(): Promise<Org[]> {
    return orgs;
}

export async function createProject(input: { name: string; organizationId: string }): Promise<Project> {
    const id = `proj_${Date.now()}`;
    const project = { id, name: input.name, organizationId: input.organizationId, createdAt: new Date().toISOString() };
    projects.push(project);
    return project;
}

export async function createChatRoomForProject(projectId: string): Promise<ChatRoom> {
    const id = `chat_${Date.now()}`;
    const chatRoom = { id, projectId, createdAt: new Date().toISOString() };
    chats.push(chatRoom);
    return chatRoom;
}