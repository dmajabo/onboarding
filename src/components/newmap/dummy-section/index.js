import styles from './section.module.scss';

const DummySection = ({ className, text, left }) => (
  <section className={`${styles.section} ${className}`}>
    <div>
      <img src="https://placekitten.com/250" alt="Kitten" />
    </div>
    <div>
      <p>
          {text}
      </p>
    </div>
  </section>
);

export default DummySection;
