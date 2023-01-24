import { useState } from "react";
import {
  useData,
  useDataDispach,
  useOptions,
  useOptionsDispach,
} from "../charts/BarChartContext";
import classes from "./Textarea.module.css";


const Textarea = () => {
  const options = JSON.stringify(useOptions(), null, 2);
  const data = JSON.stringify(useData(), null, 2);
  const optionsDispatch = useOptionsDispach();
  const dataDispatch = useDataDispach();
  const [timeoutOption, setTimeoutOption] = useState<number | undefined>();
  const [timeoutData, setTimeoutData] = useState<number | undefined>();

  const handleOptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (optionsDispatch) {
      clearTimeout(timeoutData);
      setTimeoutData(setTimeout(() => {
      optionsDispatch({
        type: "custom",
        modifiedOption: JSON.parse(e.target.value),
      });
    },1000))
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
      <textarea
        className={`${classes.textarea} ${classes.vs}`}
        placeholder="Options"
        value={options}
        onChange={handleOptionChange}
      />
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
