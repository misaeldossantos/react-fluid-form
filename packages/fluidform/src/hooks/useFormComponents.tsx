import { useContext, useMemo } from 'react'
import FormSettingsContext from '../FormSettingsContext'

export default function() {
    const settings = useContext(FormSettingsContext)
    return useMemo(() => {
        return settings.components
    }, [settings])
}