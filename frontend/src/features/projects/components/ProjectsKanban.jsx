import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ProjectColumn from "./ProjectColumn";
import "../styles/projects.css";

function ProjectsKanban({ columns, projects, onMove, onEdit, onDelete, onInlineUpdate }) {
  const grouped = columns.reduce((acc, col) => ({ ...acc, [col]: [] }), {});
  projects.forEach(p => {
    const key = p.status || columns[0];
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  // Prepare grouped data with handler references (avoid mutating original objects)
  const prepared = {};
  Object.keys(grouped).forEach(k => {
    prepared[k] = grouped[k].map(p => ({ ...p, __onEdit: onEdit, __onDelete: onDelete, __onInlineUpdate: onInlineUpdate || onEdit }));
  });

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const projectId = draggableId;
    const destStatus = destination.droppableId;
    onMove(projectId, destStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="projects-kanban">
        {columns.map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided, snapshot) => (
              <ProjectColumn title={col} projects={prepared[col] || []} provided={provided} snapshot={snapshot} />
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default ProjectsKanban;
