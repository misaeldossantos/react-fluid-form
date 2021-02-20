import { useContext, useMemo } from 'react'
import FormSettingsContext from '../core/FormSettingsContext'

export default function(forAlias) {
    const settings = useContext(FormSettingsContext)
    return useMemo(() => {
        return settings.components[forAlias]
    }, [forAlias, settings])
}