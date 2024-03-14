import { ActionButtons } from "./_components/action-buttons";

export default function EventOverviewPage({} // params: { eventId },
: {
  params: {
    eventId: string;
  };
}) {
  return (
    <div>
      <ActionButtons />

      <div>
        <div></div>
        <div>
          <div>
            <h2>When & Where</h2>
            <div>date</div>
            <div>location</div>
            <p>This address is shown publicly on the event page.</p>
          </div>
          <div>
            <button>Edit Event</button>
            <button>Change Photo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
