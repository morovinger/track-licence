<template>
  <section class="section bg-gradient-to-br from-primary-900 to-primary-800 text-white rounded-3xl my-8 md:my-12 overflow-hidden">
    <div class="container">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ title }}</h2>
        <div class="flex items-center justify-center gap-2 text-lg opacity-90">
          <svg class="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <span>Лицензия {{ licenseNumber }}</span>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Left: Accreditations -->
        <div class="space-y-6">
          <h3 class="text-xl font-bold mb-6">Официальные аккредитации</h3>

          <div class="space-y-4">
            <div
              v-for="(item, index) in accreditations"
              :key="index"
              class="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5"
            >
              <div class="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <NuxtImg
                  v-if="item.icon"
                  :src="item.icon"
                  :alt="item.title"
                  class="w-8 h-8"
                />
                <svg v-else class="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-lg mb-1">{{ item.title }}</h4>
                <p class="text-white/70 text-sm">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <!-- Verify License Link -->
          <a
            v-if="verifyLink"
            :href="verifyLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            {{ verifyText || 'Проверить лицензию' }}
          </a>
        </div>

        <!-- Right: Document Samples -->
        <div>
          <h3 class="text-xl font-bold mb-6">Документы государственного образца</h3>

          <div class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="(doc, index) in documents"
              :key="index"
              class="group bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div class="aspect-[4/3] overflow-hidden">
                <NuxtImg
                  :src="doc.image"
                  :alt="doc.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div class="p-4">
                <h4 class="font-bold text-primary-900 text-sm">{{ doc.title }}</h4>
                <p class="text-gray-500 text-xs mt-1">{{ doc.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Accreditation {
  title: string
  icon?: string
  description: string
}

interface Document {
  title: string
  image: string
  description: string
}

interface Props {
  title?: string
  licenseNumber?: string
  licenseOrg?: string
  accreditations?: Accreditation[]
  documents?: Document[]
  verifyLink?: string
  verifyText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Официальное обучение с государственной лицензией',
  licenseNumber: 'Л035-01256-60/01932940',
  accreditations: () => [
    {
      title: 'Государственная аккредитация',
      description: 'Аккредитованный учебный центр'
    },
    {
      title: 'Лицензия на образовательную деятельность',
      description: 'Выдана Министерством образования'
    }
  ],
  documents: () => [
    {
      title: 'Удостоверение тракториста-машиниста',
      image: '/images/docs/utm-sample.webp',
      description: 'Государственный образец'
    },
    {
      title: 'Свидетельство о профессии',
      image: '/images/docs/certificate-sample.webp',
      description: 'Подтверждение квалификации'
    }
  ],
  verifyLink: 'https://islod.obrnadzor.gov.ru/rlic/details/53689dae-e80f-c0ba-c887-d89b8a2e13e5/',
  verifyText: 'Проверить лицензию'
})
</script>
