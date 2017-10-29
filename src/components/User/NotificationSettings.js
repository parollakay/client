import React from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  toggle: {
    marginBottom: 5
  },
  labelStyle: {
    fontWeight:400
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: '#004588',
  },
  trackSwitched: {
    backgroundColor: '#1981d6',
  },
}
const NotificationSettings = props => {
  let allToggles = true;
  if (props.sentences || props.likes || props.achievements) {
    allToggles = false
  }
  return (
    <div>
      <h4 className="title">Email Notification Settings:</h4>
      <br />
      <div className="notificationSettings">
        <Toggle
          label="Unlocked Achievements"
          toggled={props.achievements}
          defaultToggled={props.achievements}
          style={styles.toggle}
          labelStyle={styles.labelStyle}
          thumbStyle={styles.thumbOff}
          trackStyle={styles.trackOff}
          thumbSwitchedStyle={styles.thumbSwitched}
          trackSwitchedStyle={styles.trackSwitched}
          onToggle={props.tglAchievements}
          />
        <Toggle
          label="Term Liked"
          toggled={props.likes}
          style={styles.toggle}
          labelStyle={styles.labelStyle}
          thumbStyle={styles.thumbOff}
          trackStyle={styles.trackOff}
          thumbSwitchedStyle={styles.thumbSwitched}
          trackSwitchedStyle={styles.trackSwitched}
          onToggle={props.tglLikes}
          />
        <Toggle
          label="Term used in a Sentence"
          toggled={props.sentences}
          style={styles.toggle}
          labelStyle={styles.labelStyle}
          thumbStyle={styles.thumbOff}
          trackStyle={styles.trackOff}
          thumbSwitchedStyle={styles.thumbSwitched}
          trackSwitchedStyle={styles.trackSwitched}
          onToggle={props.tglSentences}
          />
        <br />
        <Toggle
          label={allToggles ? `Disabled` : `Disable All`}
          toggled={allToggles}
          style={styles.toggle}
          labelStyle={styles.labelStyle}
          thumbStyle={styles.thumbOff}
          trackStyle={styles.trackOff}
          thumbSwitchedStyle={styles.thumbSwitched}
          trackSwitchedStyle={styles.trackSwitched}
          onToggle={props.allOff}
          />
      </div>
    </div>
  )
}

export default NotificationSettings;