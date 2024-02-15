import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ReplayIcon from '@mui/icons-material/Replay'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../Utils/const'
import { textMain } from '../Themes/colors'

export function useHandlerWatcher () {
  const ComponentWatcher = ({ children, requestState }) => {
    if (requestState === REQUEST_STATE_LOADING) {
      return <ComponentWatcherLoading>{children.ComponentWatcherLoading}</ComponentWatcherLoading>
    } else if (requestState === REQUEST_STATE_SUCCESS) {
      class ErrorBoundary extends React.Component {
        constructor (props) {
          super(props)
          this.state = { hasError: false, errorInfo: null }
        }

        componentDidCatch (error, errorInfo) {
          this.setState({
            error,
            errorInfo
          })
        }

        render () {
          if (this.state.errorInfo) {
            return (
              <Box sx={{ width: '100%', display: 'inline-block', position: 'relative', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <ComponentWatcherLoading opacity={0.4} pointerEvents='none'>
                  {children.ComponentWatcherLoading}
                </ComponentWatcherLoading>
                <ComponentWatcherError>
                  <Box sx={{ position: 'absolute', top: '50%', width: '100%', textAlign: 'center' }}>
                    Ha ocurrido un error, inténtalo más tarde.
                  </Box>
                </ComponentWatcherError>
              </Box>
            )
          }
          return this.props.children
        }
      }
      return (
        <ErrorBoundary>
          <ComponentWatcherSuccess>
            {children.ComponentWatcherSuccess}
          </ComponentWatcherSuccess>
        </ErrorBoundary>
      )
    } else if (requestState === REQUEST_STATE_ERROR) {
      return (
        <Box sx={{ width: '100%', display: 'inline-block', position: 'relative', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <ComponentWatcherLoading opacity={0.4} pointerEvents='none'>
            {children.ComponentWatcherLoading}
          </ComponentWatcherLoading>
          <ComponentWatcherError>
            <Box sx={{ position: 'absolute', top: '50%', width: '100%' }}>
              {children.ComponentWatcherError}
            </Box>
          </ComponentWatcherError>
        </Box>
      )
    } else {
      return null
    }
  }

  const ComponentWatcherSuccess = ({ children }) => {
    return children
  }

  const ComponentWatcherLoading = ({ children, opacity = 1, pointerEvents = 'auto' }) => {
    const styledChildren = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { style: { opacity, pointerEvents } })
      }
      return child
    })

    return styledChildren
  }

  const ComponentWatcherError = ({ children }) => {
    return children
  }

  const ButtonRetry = ({ onClick }) => {
    return <Button variant='text' sx={{ margin: 'auto', display: 'flex', color: textMain() }} onClick={onClick}><ReplayIcon /></Button>
  }

  return { ComponentWatcher, ComponentWatcherSuccess, ComponentWatcherLoading, ComponentWatcherError, ButtonRetry }
}
