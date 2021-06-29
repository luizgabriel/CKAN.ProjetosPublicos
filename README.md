# CKAN - Public Projects

This is a simple form bult for easing the registration of public projects by city organizations from [Dataurbe](https://dataurbe.appcivico.com/).

Demonstration vídeo (Brazilian Portuguese): https://youtu.be/Jusm-n8kP3w

<table>
  <thead>
  <tr>
    <th>
      Formulário
    </th>
    <th>
      Resultado Final
    </th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="https://user-images.githubusercontent.com/7469145/123829519-e87d6680-d8d8-11eb-81cf-2119897df25e.png" alt="Formulário"/>
      </td>
      <td>
        <img src="https://user-images.githubusercontent.com/7469145/123829330-c08e0300-d8d8-11eb-8808-cf197d59d689.png" alt="Resultado Final"/>
      </td>
    </tr>
  </tbody>
</table>

## Multilanguage Support

- Brazilian Portuguese (PT-BR)
- English (EN)
- Spanish (ES)

## CKAN Integration

This projects requires a CKAN account for authentication passed with the query string just like the example:
`https://[SERVER]/api/auth?host=https://[CKAN-SERVER]&apiKey=[API-KEY]&lang=[LANG]`
- `[SERVER]`: this project server host.
- `[CKAN-CKAN]`: the target ckan host.
- `[API-KEY]`: the CKAN API Key.
- `[LANG]`: the default language: `pt`, `en`, `es`

Example:

`https://example.herokuapp.com/api/auth?host=https://dataurbe.appcivico.com&apiKey=abcd-efgh-ijkl-mnop&lang=en`

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
