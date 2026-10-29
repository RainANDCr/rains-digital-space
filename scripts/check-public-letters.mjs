import {futureLetters} from '../src/data/spaces.js'
import {demoLetters} from '../src/data/demoLetters.js'
import {assertPublishableLetters} from '../src/utils/archive.js'
assertPublishableLetters([...futureLetters,...demoLetters])
