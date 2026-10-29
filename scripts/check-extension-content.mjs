import {artifacts,exhibitions} from '../src/data/extensions.js'
import {projects} from '../src/data/projects.js'
import {assertPublishableExtensions} from '../src/utils/nexus.js'
assertPublishableExtensions({artifacts,projects,exhibitions})
