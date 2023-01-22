import classes from "./Button.module.css";
interface ButtonProps {
  type: string;
  text: string;
  disabled: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  let className = classes.actionButton;
  switch(props.type){
    case 'addDataset': {
        className = `${className} ${classes.addDataset}`;
        break;
    }
    case 'removeDataset': {
        className = `${className} ${classes.removeDataset}`;
        break;
    }
    case 'addMonth': {
        className = `${className} ${classes.addMonth}`;
        break
    }
    case 'removeMonth': {
      className = `${className} ${classes.removeMonth}`;
      break
  }
    default: {
      className = `${className} ${classes.addDataset}`;
      break;
  }
  }
 
  return (
    <button
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
