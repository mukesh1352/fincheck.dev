interface Props {
  details: string;
  setDetails: (value: string) => void;
}

export default function DetailsForm({ details, setDetails }: Props) {
  return (
    <div className="details-group">
      <label htmlFor="detailsInput" className="details-label">
        Important Details
      </label>

      <textarea
        id="detailsInput"
        className="details-textarea"
        placeholder="Enter bank info..."
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
    </div>
  );
}
