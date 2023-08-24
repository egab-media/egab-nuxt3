import {Ref} from "vue";

export function useGetProgress() {
    async function getProgress(inputRef: any, rules: string[], progress: Ref) {
        if (process.client) {
            let errs: any[] = []
            if (inputRef) {
                const cached = await inputRef.validate()
                errs = toRaw(cached)
            }

            const worker = new Worker('/js/password-progress.worker.js')
            // Listening
            worker.addEventListener('message', (event: { data: number }) => {
                progress.value = event.data
                worker.terminate()
            })

            // initiating
            worker.postMessage({
                rules: rules,
                errs
            })
            return progress
        }
    }

    return { getProgress }
}
