<template>
  <v-app>
    <delay-hydration>
      <molecules-e-nav />
    </delay-hydration>

    <v-main>
      <v-locale-provider :rtl="locale === 'ar'">
        <slot />
        <client-only>
          <v-snackbar
              :model-value="$pwa?.offlineReady || $pwa?.needRefresh"
              multi-line
          >
            <p v-if="$pwa.offlineReady">You are offline</p>
            <p v-else>New updates available, click on reload to update</p>

            <template v-slot:actions>
              <v-btn
                  color="primary"
                  variant="outlined"
                  @click="$pwa.updateServiceWorker()"
              >
                Refresh
              </v-btn>
              <v-btn
                  color="red"
                  variant="text"
                  @click="$pwa.cancelPrompt()"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>

          <v-snackbar
            :model-value="$pwa?.showInstallPrompt && !($pwa?.offlineReady && $pwa.needRefresh)"
            multi-line
          >
            <p>Install PWA</p>
            <template v-slot:actions>
              <v-btn
                  color="primary"
                  variant="outlined"
                  @click="$pwa.install()"
              >
                Refresh
              </v-btn>
              <v-btn
                  color="red"
                  variant="text"
                  @click="$pwa.cancelInstall()"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </client-only>
      </v-locale-provider>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default defineComponent({
  name: 'DefaultLayout'
})
</script>

<script lang="ts" setup>
import {VApp} from 'vuetify/components/VApp'
import {VMain} from 'vuetify/components/VMain'
import {VLocaleProvider} from 'vuetify/components/VLocaleProvider'
import {VSnackbar} from 'vuetify/components/VSnackbar'
import {VBtn} from 'vuetify/components/VBtn'
import {useI18n} from 'vue-i18n'

const { locale } = useI18n()
</script>

<style scoped>

</style>
