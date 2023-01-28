import {
  useData,
  useDataDispach,
  useOptions,
  useOptionsDispach,
} from "../context/OptionDataContext";
import classes from "./Textarea.module.css";

interface TextareaProps {
  dislableOptions: boolean;
}
const Textarea: React.FC<TextareaProps> = (props: TextareaProps) => {
  const options = JSON.stringify(useOptions(), null, 2);
  const data = JSON.stringify(useData(), null, 2);
  const optionsDispatch = useOptionsDispach();
  const dataDispatch = useDataDispach();

  const handleOptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (optionsDispatch) {
      optionsDispatch({
        type: "custom",
        modifiedOption: JSON.parse(e.target.value),
      });
    }
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (dataDispatch) {
      dataDispatch({
        type: "custom",
        modifiedData: JSON.parse(e.target.value),
      });
    }
  };
  return (
    <div>
      {!props.dislableOptions && (
        <textarea
          className={`${classes.textarea} ${classes.vs}`}
          placeholder="Options"
          value={options}
          onChange={handleOptionChange}
        />
      )}
      <textarea
        className={`${classes.textarea} ${classes.vs}`}
        placeholder="Data"
        value={data}
        onChange={handleDataChange}
      />
    </div>
  );
};
export default Textarea;
