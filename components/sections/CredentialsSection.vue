<template>
  <section class="py-12 md:py-16">
    <div class="container">
      <!-- Section Header -->
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-6 h-0.5 bg-primary-600"></span>
          <h2 class="text-2xl md:text-3xl font-bold text-primary-900">{{ title }}</h2>
        </div>
        <p class="text-gray-600">{{ subtitle }}</p>
      </div>

      <!-- Tabs Container -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <!-- Tab Buttons -->
        <div class="flex flex-wrap border-b border-gray-200">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = index"
            class="tab-btn px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm font-semibold uppercase tracking-wide transition-all duration-200"
            :class="[
              activeTab === index
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="p-6 md:p-8">
          <TransitionGroup name="fade" mode="out-in">
            <div
              v-for="(tab, index) in tabs"
              v-show="activeTab === index"
              :key="index"
              class="tab-content"
            >
              <div class="flex flex-col lg:flex-row gap-8">
                <!-- Left: Text Content -->
                <div class="lg:w-3/5 space-y-4">
                  <h3 class="text-xl md:text-2xl font-bold text-gray-900">
                    {{ tab.title }}
                  </h3>
                  <p class="text-gray-700 font-medium leading-relaxed">
                    {{ tab.subtitle }}
                  </p>
                  <div
                    v-for="(paragraph, pIndex) in tab.paragraphs"
                    :key="pIndex"
                    class="text-gray-600 leading-relaxed text-sm md:text-base"
                  >
                    {{ paragraph }}
                  </div>
                </div>

                <!-- Right: Document Image -->
                <div class="lg:w-2/5 flex justify-center lg:justify-end">
                  <div class="relative">
                    <NuxtImg
                      v-if="tab.image"
                      :src="tab.image"
                      :alt="tab.title"
                      class="max-w-full h-auto rounded-lg shadow-md max-h-[400px] object-contain"
                      loading="lazy"
                    />
                    <div v-else class="w-64 h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg class="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Verify License Link (Only for License tab) -->
      <div v-if="verifyLink && activeTab === 1" class="mt-6 text-center">
        <a
          :href="verifyLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          {{ verifyText || 'Проверить лицензию на сайте Рособрнадзора' }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  name: string
  title: string
  subtitle?: string
  paragraphs: string[]
  image?: string
}

interface Props {
  title?: string
  subtitle?: string
  tabs?: Tab[]
  verifyLink?: string
  verifyText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Лицензия и свидетельство',
  subtitle: 'Официальные документы учебного центра',
  tabs: () => [
    {
      name: 'Аккредитация',
      title: 'Аккредитация в Гостехнадзоре',
      subtitle: 'Свидетельство подтверждающее соответствие оборудования и оснащенности образовательного процесса по обучению трактористов и машинистов самоходных машин.',
      paragraphs: [
        'Учебные учреждения, осуществляющие подготовку трактористов и машинистов самоходных машин, обязаны иметь лицензию на право осуществления такой деятельности.',
        'При выдаче учебным учреждениям лицензий на право подготовки трактористов и машинистов самоходных машин производится проверка достоверности сведений о соискателе лицензии или лицензиате в части соответствия требованиям оборудования и оснащенности образовательного процесса на основании выданных Государственной технической инспекцией (Гостехнадзор) свидетельств.'
      ],
      image: 'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/581899/bff0ed41-ff67-4d23-8b1a-787685e992cd.webp'
    },
    {
      name: 'Лицензия',
      title: 'Лицензия на образовательную деятельность',
      subtitle: 'Официальная лицензия, выданная Министерством образования.',
      paragraphs: [
        'Лицензия на осуществление образовательной деятельности подтверждает право учебного центра на проведение профессионального обучения.',
        'Документ выдан в соответствии с Федеральным законом "Об образовании в Российской Федерации" и является бессрочным.'
      ],
      image: 'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/581899/52d77d2a-be68-456e-b9fb-46a9fe98a896.webp'
    },
    {
      name: 'Свидетельство',
      title: 'Свидетельство о присвоении профессии',
      subtitle: 'Документ о профессиональном обучении государственного образца.',
      paragraphs: [
        'По окончании обучения выдается свидетельство о присвоении профессии установленного образца.',
        'Свидетельство подтверждает получение квалификации и присвоение профессии в соответствии с программой обучения.'
      ],
      image: 'https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/581899/af404ba6-94f4-4598-b4b4-85230bfd984e.webp'
    },
    {
      name: 'Удостоверение тракториста-машиниста',
      title: 'Удостоверение тракториста-машиниста',
      subtitle: 'Документ на право управления самоходными машинами.',
      paragraphs: [
        'Удостоверение тракториста-машиниста (тракториста) — документ, подтверждающий право на управление самоходными машинами.',
        'Выдается органами Гостехнадзора после успешной сдачи экзаменов. Удостоверение действительно на всей территории Российской Федерации.'
      ],
      image: 'https://i.ibb.co/wKwNzWx/doc4.png'
    }
  ],
  verifyLink: 'https://islod.obrnadzor.gov.ru/rlic/details/53689dae-e80f-c0ba-c887-d89b8a2e13e5/',
  verifyText: 'Проверить лицензию на сайте Рособрнадзора'
})

const activeTab = ref(0)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tab-btn:first-child {
  border-top-left-radius: 0.5rem;
}

.tab-content {
  min-height: 300px;
}

@media (max-width: 768px) {
  .tab-btn {
    flex: 1 1 auto;
    text-align: center;
  }
}
</style>
