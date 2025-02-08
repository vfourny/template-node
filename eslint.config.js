import tseslint from 'typescript-eslint'
import nodeToolkitEslint from '@vfourny/node-toolkit/eslint'

export default tseslint.config(
  ...nodeToolkitEslint,
)
