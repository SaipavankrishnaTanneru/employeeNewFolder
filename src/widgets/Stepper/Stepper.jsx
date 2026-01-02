import React from 'react';
import styles from './Stepper.module.css';

/**
 * A reusable stepper component using CSS Modules.
 * Now supports clickable navigation via onStepClick.
 *
 * @param {Array} steps - An array of step objects (label, icon).
 * @param {number} currentStepIndex - The 0-based index of the active step.
 * @param {function} onStepClick - Callback function to handle tab clicks.
 */
function Stepper({ steps = [], currentStepIndex = 0, onStepClick }) {
  return (
    <nav aria-label="Progress Stepper">
      <ol className={styles.stepperContainer}>
        {steps.map((step, index) => {
          
          const isCurrent = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          
          const stepClasses = `
            ${styles.step}
            ${isCurrent ? styles.stepActive : ''}
            ${isCompleted ? styles.stepCompleted : ''}
            ${!isCurrent && !isCompleted ? styles.stepInactive : ''}
          `;

          return (
            <li 
              key={step.label} 
              className={stepClasses.trim()}
              // NEW: onClick handler to navigate
              onClick={() => onStepClick && onStepClick(index)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.stepContent}>
                <span className={styles.stepIcon}>{step.icon}</span>
                
                {/* Only show label for the CURRENT active step */}
                {isCurrent && (
                  <span className={styles.stepLabel}>{step.label}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Stepper;