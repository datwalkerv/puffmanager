import ProjectChat from '@/components/ProjectChat';

type Props = { params: { id: string } };

export default function ProjectPage({ params }: Props) {
    const projectId = params.id;
    return (
        <div style={{ padding: 20 }}>
            <h1>Projekt: {projectId}</h1>

            {/* TODO: Kanban board ide */}
            <section style={{ marginTop: 20 }}>
                <h2>Kanban</h2>
                <div>— kanban komponens helye —</div>
            </section>

            <section style={{ marginTop: 20 }}>
                <ProjectChat projectId={projectId} />
            </section>
        </div>
    );
}