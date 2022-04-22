import cn from 'classnames';
//import styles from './button.module.scss';

const Button = ({ submit, className, uppercase, ...rest }) => {
  // const classNames = cn(styles.button, className, {
  //   [styles[`button-uppercase`]]: uppercase,
  // });

  return (
    <button
      {...rest}
      type={submit ? 'submit' : 'button'}
    />
  );
};

export default Button;
