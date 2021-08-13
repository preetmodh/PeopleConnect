import { Link as ReactRouterLink, browserHistory } from 'react-router';

const handleReplaceClick = (onClick, toRoute) => {
  onClick();
  browserHistory.replace(toRoute);
};

const toRender = (props, onClick) => {
  if (props.action === 'PUSH') {
    return (
      <ReactRouterLink
        {...props}
        onClick={onClick}
      />
    );
  } else if (props.action === 'REPLACE') {
    return (
      <div onClick={handleReplaceClick.bind(null, onClick, props.to)}>
        {props.children}
      </div>
    );
  }
  return null;
};

// Wrapper around React Router's Link
export const Link = (props) => {
  const handleOnClick = isToCheckoutRoute ? setRoute : props.onClick;

  return toRender(props, props.onClick);
};

Link.defaultProps = {
  action: 'PUSH',
};