import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglabel = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button style={{ margin: '0 0 0 10px' }} onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button style={{ margin: '0 0 0 10px' }} onClick={toggleVisibility}>{props.closeLabel}</button>
        {props.children}
      </div>
    </div>
  )
})

Togglabel.displayName = 'Togglable'

Togglabel.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired
}

export { Togglabel }