import { Http } from '@/utils/http/Http'
import Cookies from '@/utils/cookies/Cookies'

const cookies = new Cookies();

export default new Http(
  {
    headers: {
      'X-CSRFToken': () => cookies.get('csrftoken')
    }
  }
)
