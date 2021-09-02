import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const srcDir = 'src/'

const setupBuild = (src, dist, name) => {
    return [
        {
            input: srcDir + src,
            plugins: plugins(),
            output: {
                dir: 'dist/esm',
                format: 'esm',
                exports: 'named',
                name,
                sourcemap: true,
            },
        },
    ]
}

const plugins = () => [
    typescript({ tsconfig: './tsconfig.json' }),
    process.env.NODE_ENV === 'production' && terser(),
    replace({
        preventAssignment: true,
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    nodeResolve(),
]
export default setupBuild(
    'neural-network.ts',
    process.env.NODE_ENV === 'production' ? 'nn.min.js' : 'nn.js',
    'neural-network',
)
